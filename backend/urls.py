from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html"), name="index"),
    url(r'^admin/', include(admin.site.urls)),
]
