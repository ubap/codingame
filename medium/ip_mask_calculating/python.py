ip = input()

[ip, mask] = ip.split("/")
mask = int(mask)
mask_bytes = 0
for i in range(0, mask):
    mask_bytes = mask_bytes | (1 << 31-i)


ip_as_bytes = bytes(map(int, ip.split('.')))
ip_uint32 = int.from_bytes(ip_as_bytes, byteorder='big')

network_address = ip_uint32 & mask_bytes
network_address_bytes = network_address.to_bytes(4, byteorder='big')
network_address_string = list(map(lambda x: str(x), network_address_bytes))

broadcast = network_address | (0xFFFFFFFF^mask_bytes)
broadcast_bytes = broadcast.to_bytes(4, byteorder='big')
broadcast_string = list(map(lambda x: str(x), broadcast_bytes))

print(network_address_string[0] + "." + network_address_string[1] + "." + network_address_string[2] + "." + network_address_string[3])
print(broadcast_string[0] + "." + broadcast_string[1] + "." + broadcast_string[2] + "." + broadcast_string[3])