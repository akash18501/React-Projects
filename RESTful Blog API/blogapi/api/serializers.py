from django.db.models import fields
from rest_framework import serializers
from rest_framework.utils import field_mapping
from blog.models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Post
        fields = ['id','title','author','excerpt','content','status','published','category','slug']

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User
        fields = ['username','password']
