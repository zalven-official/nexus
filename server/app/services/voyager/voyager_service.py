
from langchain.prompts.chat import SystemMessagePromptTemplate
from langchain_core.messages import BaseMessage, SystemMessage
from langchain.prompts.chat import HumanMessagePromptTemplate
from langchain_core.prompts.chat import MessagesPlaceholder
from langchain_core.prompts.image import ImagePromptTemplate
from langchain_core.prompts.prompt import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts.chat import ChatPromptTemplate
from websocket.socket_manager import WebSocketManager
from langchain_core.runnables import RunnableLambda
from typing import List, Optional, TypedDict
from langgraph.graph import END, StateGraph
from langchain_openai import ChatOpenAI
from fastapi import WebSocket
from langchain import hub
from PIL import Image
import asyncio
import json
from app.services.voyager.voyager_tools import VoyagerTools



class VoyageerPayload(TypedDict):
  question: str
  api_key: Optional[str]
  page: int
  max_steps: int
  
class VoyagerService:

  def __init__(self, socket_manager: WebSocketManager):
    self.socket_manager = socket_manager
    self.voyager_tools = VoyagerTools()

  
  async def format_descriptions(self):
    pass
  
  async def parse(self):
    pass
  
  async def select_tool(self):
    pass
  
  async def graph_builder(self):
    pass
  
  async def call_agent(self, data: VoyageerPayload, websocket: WebSocket, room_id: str, user_id: int):
    # await self.socket_manager.broadcast_to_room(room_id, json.dumps({'1': 'helloooooooooo'}))
    await self.voyager_tools.annotate()

