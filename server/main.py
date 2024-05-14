import logging
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from websocket.socketManager import WebSocketManager
from manager.chatbotRoomManager import ChatbotRoomManager
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

socket_manager = WebSocketManager()
chatbotRoomManager = ChatbotRoomManager(socket_manager)

@app.websocket("/api/v1/ws/{room_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_id: int):
  await socket_manager.add_user_to_room(room_id, websocket)
  
  # User enters the room
  await chatbotRoomManager.user_connected(websocket, room_id, user_id)

  # User braodcast the room
  try:
    while True:
      await chatbotRoomManager.user_broadcasting(websocket, room_id, user_id)

  # Disconnection
  except WebSocketDisconnect:
    chatbotRoomManager(websocket, room_id, user_id)


if __name__ == "__main__":
  uvicorn.run("main:app", host="127.0.0.1", port=args.port, reload=True)