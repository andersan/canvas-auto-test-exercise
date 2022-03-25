# Webdriverio + cucumber automation test framework

### Preconditions
- node v15.14.0
- npm 7.7.6
- Docker 20.10.7

### Run tests
``` npm test ``` or ``` npx wdio run ./wdio.conf.ts ```

### Run tests in headless add these params in wdio.conf.ts file:
``` args: ['--headless', '--no-sandbox'] ```

### Run specific test: 
``` npx wdio run ./wdio.conf.ts --cucumberOpts.tagExpression='@test' ```

### and comment this since headless execution doesn't support installing chrome extensions:

    extensions: [
      // Entry should be a base64-encoded packed Chrome app (.crx)
      require('fs').readFileSync('./extension/extension_1_2_2_0.crx').toString('base64')
    ],

### Reporting
- Generate the allure report, execute the command: allure generate reports/allure-results/
- Execute the command: allure open to view the allure report in a browser


### Installing tool and running tests locally
1. Clone this git repo
2. Run npm install in the directory where it is installed
3. Run docker-compose down && docker-compose build && docker-compose run wdio-tests in that directory

### Usefull commands
```
nvm alias default v15.14.0
```

### Increase EC2 instance space

```
sudo growpart /dev/nvme0n1 1
```
```
sudo resize2fs /dev/root 
```

Source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html

### Troubleshoot DNS issue
```
journalctl -u systemd-resolved -f
```
Source: https://unix.stackexchange.com/questions/328131/how-to-troubleshoot-dns-with-systemd-resolved

### Start VNC server
```
vncserver :1 &
```
Source: https://ubuntu.com/tutorials/ubuntu-desktop-aws#3-configuring-the-vnc-server

### Connect to Ubuntu server
- copy canvas-qa.pem to your machine
```
sudo ssh -i "canvas-qa.pem" ubuntu@52.38.175.217
```

### Update Docker image with new code and tests

Go to Jenkins dashboard and run job **build-docker-image**

### Clean ubuntu cache

https://www.tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux/
```
sync; echo 1 > /proc/sys/vm/drop_caches
sync; echo 2 > /proc/sys/vm/drop_caches
swapoff -a && swapon -a
```

### Jenkins
http://54.218.86.47:8080/   
http://34.219.224.163:8080/
http://canvas-qa.airdev.co:8080/

### Add timeout to a specific step
```
Then(/^I add all blocks$/, { timeout: 3600000 }, () => {});
```