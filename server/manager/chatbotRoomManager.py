import sys, os
sys.path.append(os.path.abspath(os.path.join('..', 'config')))
from fastapi import WebSocket
import json
from websocket.socketManager import WebSocketManager

class ChatbotRoomManager:
    def __init__(self, socket_manager: WebSocketManager):
        self.socket_manager = socket_manager

    async def user_connected(self, websocket: WebSocket, room_id: str, user_id: int):
        message = {
            "user_id": user_id,
            "room_id": room_id,
            "message": f"User {user_id} connected to room - {room_id}"
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

    async def user_broadcasting(self, websocket: WebSocket, room_id: str, user_id: int):
        data = await websocket.receive_text()
        message = {
            "user_id": user_id,
            "room_id": room_id,
            "message": data
        }
        await self.socket_manager.broadcast_to_room(room_id, json.dumps(message))