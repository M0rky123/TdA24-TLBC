
def reservation_conf(logo, date, time, phone, lecturer_name, place):

    return f"""
        <html>
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <style>
    html {{
        width: 100%;
        
    }}
    body {{
        font-family: 'Roboto', sans-serif;
        margin: 0 auto;
        padding: 0;
        width: 540px;
        position: relative;
    }}
    img {{
        width: 100px;
        height: auto;
        position: absolute;
        right: 0px;
        bottom: 0px;	
    }}
    h1 {{
        text-align: center;
        margin-top: 50px;
    }}
    </style>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Potvrzení rezervace</h2>
            <p>Dobrý den,</p>
            <p>Vaše rezervace byla úspěšná! Lektor se vám v blízké době ozve s bližšími informacemi. V případu odmítnutí rezervace budete v čas informováni. Vámi uvedené informace můžete vidět níže:</p>
            <ul>
                <li><strong>Jméno lektora:</strong> {lecturer_name}</li>
                <li><strong>Datum a čas:</strong> {date}, {time}</li>
                <li><strong>Místo:</strong> {place}</li>
                <li><strong>Kontakt na lektora:</strong> {phone}</li>
            </ul>
            <p>Děkujeme za využití našich služeb.</p>
            <p>S pozdravem,<br><br>Teacher Digital Agency, TdA</p>
            <img src="https://lh3.googleusercontent.com/fife/ALs6j_EqeMHIuvktwF9RddMA11BSIZW745vqj4v86N2R4JYxD81xJ_247dnVwgiz9RBCRuJEIp1SB7k4Rmw5Gg98wHx8CK0Ak1ADXqOzLwJZaakY67FB39QgLy-FeUKBz01vDOuLXIgD8SKpf--NfJFuRG4Tx99c2limeU3_mpXXomkD9tTUcCTo7sTqUIKMJOtXiYQYuaznn4ERz22br_gYDAFMqOY9ESuZXteEVFxRvMrPcexWWE5X4_Lu4_E6RrQ7ymSzcmJ2IOM7qz2wnK44fzeJVn4Oe5thx7veEaXo9QV5oMy0Qk5niXHggg1lhySzFqdam6ntP_gd7Bk5XL8j89BOmEBlvSZ0RbElRf8BlvtL9AHxd2s-abEtuML6r_lMO9QZvr0B3tIRb_mHLBDqYjaqnA3HQx7T84Qq0rQ1U72veyTzfDBJYlahs_U2Hue1iZKgcqQFksIF5qJaURkqy87AtZzzv5VmP8YP8RGPziY1DWUTZEFy6lxeYHjeg4b0a1me3EcT56o6gnTU2gTYo0IToUJTRzoMoYEko35Z0dSE_fAkLwd4GKN5P00WvRTrSwfegXX5FXadGwlQk_WZQq-1L9lbuRYhxDN9fDMxqUjOroKhPp93xJhfMi2kfVvyrl8-yaJiVVTW5E77xe91Udz_LffuTPxM5FTefQitkUpMgWZS_Ihx0J583CjzKyp67OdYzPIwEfiSkBIKwISQYx_yXYMegOEvcIoRDYyxYT6Llx_YUdqUM_FPcmqhhdwlNsZEFVdUlfWUCrvYBAzoQmuyPK5xM2FIg5bkc7vohuAaFvT3cnsU_vd6OciNXDhVXCWN4huRxNAQ1XFBe91xn4AjZBu23B5LhQl4_jg9WpLOaUi6OhOOZ3O7sWn76fa1042dx8Y5Pr-wu2UiCb1EeM3IsBcUhJh2AJQEUJNLz8w6IdsfTzPZbozPSKLRV5j6X-HqaK-jLHSDkPqXQBWwfezzCcgSMk8p4QqgWxKVuMSyQRVufkxfKzkr5NthSHywO7e17SHOq_EPghAStDZFs5D9MVYYdtjk3a5xJTVDZ19ghcb9w0sS95sIcJeHnncSHNhkXVpgcT_8cKKBN1ILJN492AGTK6_pSgL9zrmfhtBVGZEfHhgOLGhZl7bMSU96CNQ0IeRmLmODTJ_FoGPK6hPSV8mxXdzv9ayqpSN-Euufg6OtwS6MbxaZ9UJNUTfUJY023HmalWKd7dl0UieWgS-iMkBHEhm77Fz-Dw09UZ69Djvli7WbADgIJE5xvf56wY5LjLY3BQJfBBA1qn9ogyKRRx5sH14yNTUeDPNrWfHIUJEuIkJPfSxH12rtR89P3cavjPTVDefhTm43PJmIH5CwVynMVvg8R2GHdVtEglGwtxhte49Bx8CMorf5N5A_aZjWbC5uX_GKGq0_nw0ZihK8Jw1OLU9YdvYGtOY_9tyReqe0eAmRxghzS1gT7lvtf_VAVXPZMVtegr9s9vS-a6lUIYjt0wnLcdh4edw_ftXjXz2d3JHleuCEW87AmsUTvPKzHb1kr51bt5I3IApX_COmIHplzw9askMbcVCraH6qGigRJA=w873-h912"/>
        </div>
    </body>
    </html>
        """