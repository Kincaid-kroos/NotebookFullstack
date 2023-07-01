from django.shortcuts import render
from .models import Tododb
from .serializers import Tododbserializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
#in place of try except blocks use the get_object_or_404 django built in handler
from django.shortcuts import get_object_or_404


@api_view(["GET","POST"])
def task_list(request):
  if request.method =="GET":
    tasks = Tododb.objects.all() #getting all the objects
    serializer =Tododbserializer(tasks,many=True) #Serializing to JSON
    return Response(serializer.data)
   
  elif request.method =="POST":
     serializer = Tododbserializer(data=request.data) #deserializing back from JSON to allow posting
     if serializer.is_valid():
       serializer.save()
       return Response(serializer.data,status=status.HTTP_201_CREATED)
     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
#Complete using get_object_or_404 but you can remove post since we already did something about it up here
#i placed it just as a way to show a complete CRUD code
@api_view(["GET","POST","PATCH","PUT","DELETE"])
def task_detail(request,pk):
  tasks = get_object_or_404(Tododb,id=pk)

  if request.method =="GET":
    #In the GET method, there is no need to retrieve all tasks using Tododb.objects.all().
    # Instead, you can directly use the tasks object retrieved by get_object_or_404 as the input for the serializer.
    task = Tododb.objects.all()
    serializer = Tododbserializer(tasks)
    return Response(serializer.data)
  
  #You can combine post and put as   elif request.method in ["PUT", "PATCH"]:
  #In the PUT and PATCH methods, you can use the partial=True argument when instantiating the serializer. 
  #This allows partial updates in the PATCH method, where only specific fields are updated.
  elif request.method == "POST":
    serializer = Tododbserializer(data=request.data) #deserializing back from JSON to allow posting
    if serializer.is_valid():
       serializer.save()
       return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == "PUT":
    serializer = Tododbserializer(tasks,data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == "PATCH":
    serializer = Tododbserializer(tasks,data=request.data,partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == "DELETE":
    tasks.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  



# Create your views here.
