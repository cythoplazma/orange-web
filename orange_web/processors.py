def get_current_host(request):
    """
    Get host of where this Django app is hosted.
    """
    return {'current_host': request.META['HTTP_HOST']}
