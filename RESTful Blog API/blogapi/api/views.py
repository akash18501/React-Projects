from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import authentication, serializers
from rest_framework.response import Response
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.generics import RetrieveAPIView, RetrieveAPIView ,ListCreateAPIView,RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from .custompermissions import PostWriteCustomPermission
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets
# Create your views here.

# class PostList(ListCreateAPIView): 
#     permission_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()
#     serializer_class = PostSerializer

# class PostDetail(RetrieveUpdateDestroyAPIView): 
#     permission_classes = [PostWriteCustomPermission]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#using model viewset rather than concrete classes
class PostList(viewsets.ModelViewSet): 
    permission_classes = [IsAuthenticated]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer


    def get_object(self,queryset= None,**kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post,slug = item)

class CreateNewUser(APIView): 
    permission_classes = [AllowAny]

    def post(self,request): 
        data = request.data
        serializer = UserSerializer(data = data)
        if serializer.is_valid(): 
            serializer.save()
            return Response({'msg':"user created successfully"},status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView): 
    permission_classes = [AllowAny]

    def post(self,request): 
        try: 
            data = request.data['refresh_token']
            token = RefreshToken(data)
            token.blacklist()
            return Response({"masg":"successfully logged out"},status=status.HTTP_200_OK)
        except: 
            return Response({"msg":"token not found"},status=status.HTTP_400_BAD_REQUEST)
