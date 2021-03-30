# nodejs_crud
### https://github.com/rneogns/webapp.git
```
# using git
echo "# webapp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rneogns/webapp.git
git push -u origin main

# using git clone
-- git config --global http.sslVerify false
git clone https://github.com/rneogns/webapp.git webapp
cd webapp
npm install

# using node.js
npm init
npm install express, mysql, dotenv, cors --save
npm install nodemon --save-dev
```