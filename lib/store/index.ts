import { create, StateCreator } from 'zustand'
import { Conversation, ConversationActions, createConversationSlice } from './slices/createConversationSlice'

type ConversationSlice = Conversation & ConversationActions

const useBoundStore = create<ConversationSlice>()((...a) => ({
  ...createConversationSlice(...a),
}))