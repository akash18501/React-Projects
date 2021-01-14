from django import urls
from django.urls import path
from django.urls.conf import include
from .views import PostList,CreateNewUser,UserLogout
from rest_framework.routers import DefaultRouter
app_name = 'blog'

router = DefaultRouter()
router.register('',PostList,basename="posts")


urlpatterns = [
  # path('<int:pk>/',PostDetail.as_view(),name="detailcreate"), 
  # path('',PostList.as_view(),name='listcreate'), 
  path('',include(router.urls)), 
  path('user/register/',CreateNewUser.as_view(),name="register new user"), 
  path('user/logout/',UserLogout.as_view(), name="logout user"),
]
