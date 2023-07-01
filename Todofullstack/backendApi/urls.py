from django.urls import path
from . import views

urlpatterns = [
    path("backendapi/",views.task_list),
    path('backendapi/<int:pk>', views.task_detail)

]
