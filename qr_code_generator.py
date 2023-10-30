import qrcode
from PIL import Image

value = "click.ro"

qr_code = qrcode.QRCode(version=1, box_size=10, border=5)
qr_code.add_data(value)
qr_code.make(fit=True)

qr_image = qr_code.make_image(fill="black", back_color="white")

qr_image.save("click_ro.png")