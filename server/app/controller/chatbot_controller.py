from fastapi import WebSocket
from websocket.socket_manager import WebSocketManager
from typing import List, Optional, TypedDict
from app.services.voyager.voyager_service import VoyageerPayload, VoyagerService
import json

class VoyageerPayload(TypedDict):
  question: str
  api_key: Optional[str]
  page: int
  max_steps: int
  
  
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
    
    # Extract data
    data_dict = json.loads(data)
    payload = VoyageerPayload(**data_dict)

    # Call agent
    voyager = VoyagerService(self.socket_manager)
    await voyager.call_agent(payload, websocket, room_id, user_id)
    await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))

  async def user_disconnected(self, websocket: WebSocket, room_id: str, user_id: int):
    await self.socket_manager.remove_user_from_room(room_id, websocket)
    message = {
      "user_id": user_id,
      "room_id": room_id,
      "message": f"User {user_id} disconnected from room - {room_id}"
    }
    await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))