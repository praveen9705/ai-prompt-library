from django.db import models

class Prompt(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    view_count = models.IntegerField(default=0)

    # ✅ ADD THIS LINE
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title