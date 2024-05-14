import sys
import os
from fastapi import WebSocket
from websocket.socket_manager import WebSocketManager
import json

# Add the configuration path to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.abspath(os.path.join(current_dir, '..', 'config'))
sys.path.append(config_path)

class ChatbotController:
  _instance = None
  def __init__(self, socket_manager: WebSocketManager):
    self.socket_manager = socket_manager

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