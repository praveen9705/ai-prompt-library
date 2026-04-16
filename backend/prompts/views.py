from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
import json
from .models import Prompt


# ✅ GET ALL + ADD
@csrf_exempt
def get_prompts(request):

    if request.method == "GET":
        prompts = Prompt.objects.all()

        data = [
            {
                "id": p.id,
                "title": p.title,
                "content": p.content,
                "view_count": p.view_count,
            }
            for p in prompts
        ]

        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))

            title = data.get("title")
            content = data.get("content")

            if not title or not content:
                return JsonResponse({"error": "Missing fields"}, status=400)

            prompt = Prompt.objects.create(
                title=title,
                content=content
            )

            return JsonResponse({
                "id": prompt.id,
                "title": prompt.title,
                "content": prompt.content,
                "view_count": prompt.view_count
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid method"}, status=405)


# ✅ SINGLE PROMPT
def get_prompt(request, id):
    try:
        prompt = Prompt.objects.get(id=id)

        prompt.view_count += 1
        prompt.save()

        return JsonResponse({
            "id": prompt.id,
            "title": prompt.title,
            "content": prompt.content,
            "view_count": prompt.view_count,
        })

    except Prompt.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)


# ✅ TRENDING
def trending_prompts(request):
    prompts = list(Prompt.objects.all())
    result = []

    for p in prompts:
        hours = max((now() - p.created_at).total_seconds() / 3600, 1)
        score = (p.view_count * 2) + (10 / hours)

        result.append({
            "id": p.id,
            "title": p.title,
            "content": p.content,
            "view_count": p.view_count,
            "score": round(score, 2)
        })

    result.sort(key=lambda x: x["score"], reverse=True)

    return JsonResponse(result, safe=False)