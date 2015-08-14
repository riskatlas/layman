import requests

url = 'http://liferay.local/cgi-bin/layman/layman/secure/add'
values = {'name' : 'user123',
          'roles' : {'admin','hasici','policajti'}
         }
cookies = {'JSESSIONID': 'D0A54FA64671B526C264F948B702BA24'}

print requests.post(url, data=values, cookies=cookies).text

