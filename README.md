# thingy52-tingg
Connects a Nordic thingy:52 to tingg.io

# Installation

## Setup Raspbian
1. [Install](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) Raspbian on your Raspberry Pi's SD card using [Etcher](https://etcher.io/).
> To enable the SSH server on your Pi, make a new file called ssh without any extensions in the boot partition on the SD card.

2. Insert the SD card and power up the Raspberry Pi. Then log in using the default username and password. It's higly recommended to change the default password using the `passwd` command.
3. Update the package manager: `sudo apt-get update`.
4. Add the latest version of Node.js to package manager: `curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`
5. Install dependencies: `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev git nodejs`

## Configuration

Create a tingg.io account and set up a thing. More details will follow.
Copy the thing ID and the thing key into index.js

## NPM and run  

Install all dependencies:
`npm install`

Run the script: `node index.js`
