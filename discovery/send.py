import socket
import random
 
address = ('<broadcast>', 5053)
 
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
s.sendto(("lucky number is: "+str(random.randint(1, 100))).encode(), address)
 
(buf, ip) = s.recvfrom(1024)
print("from %s: %s" % (ip, buf.decode()))
