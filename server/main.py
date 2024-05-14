import logging
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from websocket.socket_manager import WebSocketManager
from app.controller.chatbot_controller import ChatbotController

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
chatbot_manager = ChatbotController(socket_manager)
      
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