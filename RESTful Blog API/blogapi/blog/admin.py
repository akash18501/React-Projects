from django.contrib import admin
from django.db import models
from .models import Category,Post
# Register your models here.

@admin.register(Post)
class Authoradmin(admin.ModelAdmin): 
    list_display = ['id','title','category','slug','status','author','published']
    prepopulated_fields = {'slug':('title',),}




@admin.register(Category)
class Authorcategory(admin.ModelAdmin): 
    list_display = ['id','name']