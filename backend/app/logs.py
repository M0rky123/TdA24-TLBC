class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'



def log(msg_type, message):
    log_type = "Info"
    info = f"{bcolors.BOLD}[{msg_type}{log_type}{bcolors.BOLD}]{bcolors.ENDC}"
    if msg_type == "error":
        log_type = "Error"
        print(info = f"{bcolors.BOLD}[{msg_type}{log_type}{bcolors.BOLD}]{bcolors.ENDC}")
    elif msg_type == "warning":
        log_type = "Warning"
        print(print(info = f"{bcolors.BOLD}[{msg_type}{log_type}{bcolors.BOLD}]{bcolors.ENDC}"))
    elif msg_type == "success":
        log_type = "Success"
        print(print(info = f"{bcolors.BOLD}[{msg_type}{log_type}{bcolors.BOLD}]{bcolors.ENDC}"))
    else:
        print(print(info = f"{bcolors.BOLD}[{msg_type}{log_type}{bcolors.BOLD}]{bcolors.ENDC}"))
