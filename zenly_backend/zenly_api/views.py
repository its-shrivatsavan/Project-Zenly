from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
import json, os, tempfile, base64, requests
from .ai_core.ai_therapist import handle_user_message, generatePrompts, user_sessions, detect_anxiety, decrypt_data, AES_KEY, clear_userdata

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

load_dotenv()
@csrf_exempt
def text_to_speech(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text_input = data.get("text", "").strip()
            if not text_input:
                return JsonResponse({"error": "Text is empty"}, status=400)

            # Call EdenAI (or your TTS generator)
            payload = {
                "fallback_providers": ["amazon"],
                "response_as_dict": True,
                "attributes_as_list": False,
                "show_base_64": True,
                "show_original_response": False,
                "rate": -5,
                "pitch": 2,
                "volume": 0,
                "sampling_rate": 0,
                "providers": ["openai"],
                "language": "en",
                "text": text_input,
                "option": "FEMALE"
            }

            headers = {
                "accept": "application/json",
                "content-type": "application/json",
                "authorization": f"Bearer {os.getenv('EDEN_API_KEY')}"
            }

            response = requests.post("https://api.edenai.run/v2/audio/text_to_speech", json=payload, headers=headers)
            result = response.json()
            audio_base64 = result["openai"]["audio"]

            audio_data = base64.b64decode(audio_base64)
            temp_audio_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
            temp_audio_file.write(audio_data)
            temp_audio_file.close()

            return FileResponse(open(temp_audio_file.name, "rb"), content_type="audio/mpeg")

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    
@csrf_exempt
def chatbot_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = request.session.session_key or "default_user"
            user_message = data.get("message", "").strip()

            if not user_message:
                return JsonResponse({"response": "Please enter a message."}, status=400)

            if detect_anxiety(user_id, user_message):
                return JsonResponse({
                    "response": (
                        "Would you like to try a short guided breathing exercise? Here are two videos you can choose from:\n\n"
        "🔗 [Guided Breathing Exercise 1](https://youtu.be/SNqYG95j_UQ?feature=shared)\n\n"
        "🔗 [Guided Breathing Exercise 2](https://youtu.be/0BNejY1e9ik?si=n4DKhsudJZg1E4W7&t=18)\n\n"
        "Feel free to follow along at your own pace and see if it helps ease some of what you're feeling right now. 💙"
                    ),
                    "session_note": "anxiety_triggered"
                })

            # Continue with the regular AI response flow
            ai_output = handle_user_message(user_id, user_message)

            if isinstance(ai_output, dict):
                print(ai_output.get("session_note", ""))
                return JsonResponse({
                    "response": ai_output.get("response", ""),
                    "session_note": ai_output.get("session_note", "")
                })
            else:
                return JsonResponse({"response": ai_output})

        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({"response": f"Server error: {str(e)}"}, status=500)

    return JsonResponse({"response": "Only POST allowed"}, status=405)
    

@csrf_exempt
def journal_prompt_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = request.session.session_key or "guest"
            message = data.get("message", "")
            response = generatePrompts(user_id, message)

            return JsonResponse({"prompts": response})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

@csrf_exempt
def list_archived_sessions(request):
    user_id = request.session.session_key or "default_user"
    
    sessions = user_sessions.get(user_id, {}).get("session_archive", [])
    metadata = [{"session_id": s["session_id"], "timestamp": s["timestamp"]} for s in sessions]
    
    return JsonResponse({"sessions": metadata})

@csrf_exempt
def decrypt_session_summary(request):
    """
    Endpoint to decrypt a session summary.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get("session_id")
            user_id = request.session.session_key or "default_user"

            archive = user_sessions.get(user_id, {}).get("session_archive", [])

            for session in archive:
                if session["session_id"] == session_id:
                    decrypted = decrypt_data(session["encrypted_summary"], AES_KEY)
                    return JsonResponse({"decrypted_summary": decrypted})

            return JsonResponse({"error": "Session not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method, only POST is allowed."}, status=405)

@csrf_exempt
def clear_user_sessions(request):
    if request.method == 'POST':
        user_id = request.session.session_key or "default_user"

        result = clear_userdata(user_id)  # Your helper function
        return JsonResponse({"message": result})

    return JsonResponse({"error": "Invalid method. Use POST."}, status=405)



    
