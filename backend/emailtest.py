import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 587
sender_email = 'matyas.cernik@gmail.com'

recipient_email = 'thekronisofficial@gmail.com'

# Create message container
message = MIMEMultipart()
message['From'] = sender_email
message['To'] = recipient_email
message['Subject'] = 'Test Email'

# HTML content for the email
html_content = """
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