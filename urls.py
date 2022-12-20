from django.urls import path
from . import views

urlpatterns = [
    path('', views.upload,name='home'),
    path('result/', views.result,name='result'),
    path('compare/', views.compare,name='compare'),
    path('compresult/', views.compresult,name='compresult'),
    path('about/', views.about,name='about'),
    path('contact/', views.contact,name='contact'),
    path('login',views.handlelogin,name='handlelogin'),
    path('signup',views.handlesignup,name='handlesignup'),
]
