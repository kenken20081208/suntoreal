from django.urls import path
from . import views
from .views import chat_view, get_messages, send_message

app_name = "chat"
urlpatterns = [
    path("", chat_view, name="chat"),
    path("get_messages/", get_messages, name="get_messages"),
    path("send_message/", send_message, name="send_message"),
    path("create/", views.create, name="create"),
    path("index", views.index, name="index"),
    path("chat.html", views.index, name="chat_html"),
]
