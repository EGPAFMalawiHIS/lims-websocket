import asyncio
import time
import socketio

loop = asyncio.get_event_loop()
sio = socketio.AsyncClient()
start_timer = None
i = 0

async def send_ping():
    global start_timer
    start_timer = time.time()
    await sio.emit('orders',str(i))


@sio.event
async def connect():
	global i
	print('connected to server')
	i = i + 1
	await send_ping()

@sio.event
async def orders(data):
    print('orders: ',data)
    


@sio.event
async def pong_from_server():
    global start_timer
    latency = time.time() - start_timer
    print('latency is {0:.2f} ms'.format(latency * 1000))
    await sio.sleep(1)
    await send_ping()


async def start_server():
    await sio.connect('http://localhost:3011')
    await sio.wait()


if __name__ == '__main__':
    loop.run_until_complete(start_server())