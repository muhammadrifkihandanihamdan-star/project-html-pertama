import time 
import sys 
from threading import Thread 

berjalan = True 

def hitung_jam():
    global berjalan
    while berjalan:
        waktu = time.strftime("%H:%M:%S")
        tanggal = time.strftime("%A, %d %B %Y")
        teks = f"\r🗓️ {tanggal} | ⏰ {waktu}"
        print(teks, end="", flush=True)
        time.sleep(1)

t = Thread(target=hitung_jam)
t.daemon = True
t.start()

print("--- JAM DIGITAL INTERAKTIF ---")
input("Tekan[ENTER] untuk berhenti...\n\n")

berjalan = False
time.sleep(0.5) 
print("\nJam berhasil dihentikan.")   