from email.mime.image import MIMEImage
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .email_templates import reservation_conf

# Email configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 587
sender_password = 'uyxz fvqd lsnv pvkd'
sender_email = 'reservations.thelastbraincell@gmail.com'

# Create message container

def reserve_confirm(email, lecturer, date, time, lecturer_phone, place):
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = 'TdA - Potvrzení rezervace'

    # HTML content for the email
    logo = "https://lh3.googleusercontent.com/fife/ALs6j_GGujvMTR76XDB3ucBVrbCJQcvSV1SKMyHlUh1ac2W_AjrjkT7iI0jspY_ODhArfkxuTrM-dNnttowkEKnXXtJYMfNSV04jAxPbOl5UCGATQAir5iHjfYCMcVx0u1QLGxUPrRmRBYbY2CFOhe0vt0Z6ATbPygItsghAKa-zkWGuJ5kMDpVToen98SpS2ZoOVemHLc8hqVlD3J1JptgjHEbw-jarzxy1gPLjOuqUdr4xLC_AjO1KZRmmV262HowpSi7Nnfxj1qR3eLDc72IOxVEPJSqeU0XoaZ00-uiClRbiQYGE-72VuXxvWvpnRC4YucptHySXx-HKOSJtQqI_L4hpSqE8KJkKK-jpMmCHb7vSw4xhMI3t7FqaeToEf8g5LXpbZEaFCTxr8qR3T2sESsOBJik5gWr_fgKo5DfUweQ9RSy9WS1Ipi_IVNuX6_PO55uAUh8R4iMBmEWOPWrEL6_bfEH0G-Vk1gGSxxdPqwPMZ56lpVsl3VUJV87Ko5lT1OpdipXc4Vfc98Q19i7GNj5OWBakywbDlobK09RpON2Rf8om9GeU_zFwO0fpe8p31lL-AaQqe3RmGe5ZDzfB0D7oi7aeOxbPzo5tz8nG7qgMpadWGOdZrhX6QWanrUpAZdrjR5M7usioyW_FZKL3iDOa3shA-GxFvsCN_QLxlGXsACHrMTK0gv9dUnVnuSWmZ73p5N25lO_ebIYnTxibUDOPUy1ottKlcLfDFCV6SBX8ozdGBTnvtLnEABf3Z5vVOK1WINc9v0xYTi4mnZSR4gDbLJ9GM-bMeQV1SePiCR6wfaCWSRULUILt_ndnAIX6_u8NQwvtheWUoSsvjF3VEgADu9SY6LXVKHnFFgFOzbd0VDg5OqBS1uP6ukhGRa9oYmrIaRqk1cfJPvBf3AuALQCOEKi2ttkTxuktAtcmqKvXld4fnFbsYH0ZuTqDP1zaI8OB2LUrUBfiSIenT0ZVBSUPX1JnZ_CWa-A_xMs5Wwenwdc3LXFSW1jZTVQCIHQBHjEGBxkJf_EZldjCn6Lrz7kGt5_flG1n5grjcQK6nRkD_QETbkwr1Ezr39oAO6UPfdcB-DUb5kQXuhpka7aIgxEhoPSS6aemqLrA5wfAYkZ40C9doK28zuNaboOLKnQLlIs6jlH3iV-qVgzJblbVnIm0EbRFxbX35diB0wTe51ky710m6CDxUUiqHuCjVNXtP7gHn77nAP_MdPlXBko4hqaXm72Yxu_6myTFQ9NTZL5ytvrlf6LEA3pcVXNqN0Wnd5EZg7AFgtVuFoYmezrfOzqDaokh71Sw4DL9Jjoz5YIDF1o4udrqk7R3Hwxqi95VmPcmaCb52KtD9fDjM5IgxI4GYZiTIjeWbD8kwsGuQp4xIOhnW7Xa5QDzfcHsQhyXBzJeMv4o3DWG0LpX7eML-MbUbTe_B8kKqMMu18skw5l20Pef7flICsIVVADVvdtc7oZueN-fjNxCYFchBkCKpjtFDYTjJiGNLwTQcOrg9gmo17FYJUXmTicQFMTVFlxp23c_UCPyNtYK6fCHD5et6ctq7NXkmNM3EI4az6DRy_NBVsTCgA=w1920-h912"
    html_content = reservation_conf(logo, date, time, lecturer_phone, lecturer, place)

    # Attach HTML content to the email
    message.attach(MIMEText(html_content, 'html'))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Secure the connection
        server.login(sender_email, sender_password)
        server.send_message(message)

