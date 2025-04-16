from django.urls import path
from . import views

urlpatterns = [
    path("chatbot/", views.chatbot_view),
    path("journal/prompts/", views.journal_prompt_view),
    path("tts/", views.text_to_speech),
    path("sessions/", views.list_archived_sessions),
    path('sessions/clear/', views.clear_user_sessions),
    path("sessions/decrypt/", views.decrypt_session_summary),
]
