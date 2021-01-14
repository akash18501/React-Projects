from rest_framework.permissions import SAFE_METHODS,BasePermission

class PostWriteCustomPermission(BasePermission): 
    def has_object_permission(self, request, view, obj):
        message = "only the author of the post can view or edit or delete a particular post"
        print("request.methods is",request.method)
        print("request user is",request.user)
        if request.method in SAFE_METHODS: 
            return True

        return request.user == obj.author