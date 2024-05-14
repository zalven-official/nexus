import logging
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from websocket.socketManager import WebSocketManager
from app.chatbotManager import ChatbotManager
import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-p", "--port", default=8000, type=int)
args = parser.parse_args()



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FastAPI app")

app = FastAPI()

# Adding the CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatbotManager:
  _instance = None

  def __new__(cls, socket_manager: WebSocketManager):
    if cls._instance is None:
      cls._instance = super(ChatbotManager, cls).__new__(cls)
      cls._instance.socket_manager = socket_manager
    return cls._instance

  async def user_connected(self, websocket: WebSocket, room_id: str, user_id: int):
    message = {
      "user_id": user_id,
      "room_id": room_id,
      "message": f"User {user_id} connected to room - {room_id}"
    }
    await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))

  async def user_broadcasting(self, websocket: WebSocket, room_id: str, user_id: int):
    data = await websocket.receive_text()
    message = {
      "user_id": user_id,
      "room_id": room_id,
      "message": data
    }
    await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))

  async def user_disconnected(self, websocket: WebSocket, room_id: str, user_id: int):
    await self.socket_manager.remove_user_from_room(room_id, websocket)
    message = {
      "user_id": user_id,
      "room_id": room_id,
      "message": f"User {user_id} disconnected from room - {room_id}"
    }
    await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))

socket_manager = WebSocketManager()
chatbot_manager = ChatbotManager(socket_manager)
      
@app.websocket("/api/v1/ws/{room_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_id: int):
    await socket_manager.add_user_to_room(room_id, websocket)
    await chatbot_manager.user_connected(websocket, room_id, user_id)
    try:
        while True:
            await chatbot_manager.user_broadcasting(websocket, room_id, user_id)
    except WebSocketDisconnect:
        await chatbot_manager.user_disconnected(websocket, room_id, user_id)
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=args.port, reload=True)