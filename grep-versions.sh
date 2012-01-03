echo "******* Chrome WebStore version:"
grep "version" src/manifest/manifest.json

echo "******* HTML5 AppCache version:"
grep "Version" war/timout.appcache

echo "******* AppEngine version:"
grep "version" war/WEB-INF/appengine-web.xml


