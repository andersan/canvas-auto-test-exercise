FROM node:14.16.1-slim as base
ENV WEBDRIVERIO_HOME /webdriverio
WORKDIR ${WEBDRIVERIO_HOME}

FROM base as build
RUN apt update \
    && apt install -y \
    libglib2.0-0 \
    libxpm4 \
    libxrender1 \
    libgtk2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libx11-6 \
    libnss3 \
    xorg xvfb gtk2-engines-pixbuf \
    dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable \
    wget \
    gnupg gnupg1 gnupg2 \
    unzip \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatspi2.0-0 \
    libgtk-3-0 \
    libxkbcommon0

RUN apt install -y xdg-utils

#RUN wget https://chromedriver.storage.googleapis.com/90.0.4430.24/chromedriver_linux64.zip && \
#    unzip chromedriver_linux64.zip && \
#    cp ./chromedriver /usr/bin/ && \
#    chmod ugo+rx /usr/bin/chromedriver

#Get specific Chrome version here https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
# ENV GOOGLE_CHROME_VERSION "96.0.4664.110-1"
ENV GOOGLE_CHROME_VERSION "99.0.4844.82-1"

RUN wget http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${GOOGLE_CHROME_VERSION}_amd64.deb && \
    dpkg -i google-chrome-stable_${GOOGLE_CHROME_VERSION}_amd64.deb && \
    google-chrome-stable --version 

#Install newest Chrome version
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
# && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# RUN apt update && apt -y install google-chrome-stable

# don't re-install node packages every time unrelated code changes
COPY package.json /tmp/package.json
RUN cd /tmp
WORKDIR /tmp

RUN npm i --verbose
RUN ls 
RUN pwd
RUN cp -a /tmp/node_modules ${WEBDRIVERIO_HOME}
RUN cd ${WEBDRIVERIO_HOME}
WORKDIR ${WEBDRIVERIO_HOME}


# RUN npm ci --verbose

EXPOSE 9515

RUN apt-get install -y apt-transport-https apt-utils
RUN echo 'deb http://deb.debian.org/debian stretch-backports main' >> /etc/apt/sources.list \
    && apt-get update \
    && mkdir -p /usr/share/man/man1mkdir -p /usr/share/man/man1 \
    && DEBIAN_FRONTEND=noninteractive apt-get -t stretch-backports install -y openjdk-11-jdk


RUN apt install -y xauth

COPY . ${WEBDRIVERIO_HOME}


# RUN export DISPLAY=:99 && Xvfb -ac :99 -screen 0 1280x1024x16 &
# RUN touch /root/.Xauthority
# RUN xauth add chris-ThinkPad-X1-Carbon-Gen-9/unix:0  . 104de85e60f9ea73300ae3c942ee0499

RUN apt-get update && apt-get install -y locales-all vim mc less tmux strace procps curl
# RUN  xvfb-run --server-args="-screen 0 1280x1024x16" 
#ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]
