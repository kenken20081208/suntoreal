from mailbox import Message
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json


def create(request):
    toukou = request.POST.get("toukou")
    new_toukou = Message(character=toukou)
    new_toukou.save()
    return HttpResponseRedirect(reverse("chat:index"))


def index(request):
    all_toukou = Message.objects.values_list("character", flat=True)
    context = {"all_toukou": all_toukou}
    return render(request, "chat/chat.html", context)


@login_required
def chat_view(request):
    """チャット画面の表示"""
    messages = Message.objects.all()
    return render(request, "chat/chat.html", {"messages": messages})


def get_messages(request):
    """新しいメッセージを取得"""
    messages = Message.objects.order_by("-timestamp")[:10]
    return JsonResponse(
        [
            {
                "user": msg.user.username,
                "content": msg.content,
                "timestamp": msg.timestamp.strftime("%H:%M:%S"),
            }
            for msg in messages
        ],
        safe=False,
    )


@csrf_exempt
def send_message(request):
    """メッセージをDBに保存"""
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message")
        if message and request.user.is_authenticated:
            msg = Message.objects.create(user=request.user, content=message)
            return JsonResponse(
                {
                    "user": msg.user.username,
                    "content": msg.content,
                    "timestamp": msg.timestamp.strftime("%H:%M:%S"),
                }
            )
    return JsonResponse({"error": "Invalid request"}, status=400)
