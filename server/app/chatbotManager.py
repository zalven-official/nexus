import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.abspath(os.path.join(current_dir, '..', 'config'))
sys.path.append(config_path)
from fastapi import WebSocket
from websocket.socketManager import WebSocketManager
import json

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