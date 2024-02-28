import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 587
sender_password = 'uyxz fvqd lsnv pvkd'
sender_email = 'reservations.thelastbraincell@gmail.com'

# Create message container

def reserve_confirm(email, lecturer, date, time):
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = 'TdA - Potvrzení rezervace'

    # HTML content for the email
    html_content = f"""
    <html>
    <head></head>
    <body>
    <h1>This is a test HTML email sent from Python</h1>
    <p>Hello, <strong>World!</strong></p>
    </body>
    </html>
    """

    # Attach HTML content to the email
    message.attach(MIMEText(html_content, 'html'))

    # Connect to SMTP server
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Secure the connection
        server.login(sender_email, sender_password)
        server.send_message(message)

