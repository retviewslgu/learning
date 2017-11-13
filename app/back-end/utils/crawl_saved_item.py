import os
# https://docs.python.org/2/tutorial/classes.html

# http://lxml.de/
# http://lxml.de/xpathxslt.html
# http://lxml.de/lxmlhtml.html
from lxml import html
import lxml

import codecs


test_path = '/Users/ludovicgustin/Desktop/Example Domain.htm'
prod_path = '/Users/ludovicgustin/Desktop/Saved_all_loaded.htm'


def get_crawled_data():
        # path = raw_input('Provide the full path + filename :')
        path = prod_path
        print('the path '+path)
        f = codecs.open(path, 'r')
        page_text = f.read()
        # print (page_text) # OK
        tree = html.fromstring(page_text)
        # all_sections = tree.xpath('//div[@class="col-5"]')
        all_saved_items = tree.xpath("//div[@class='_4bl9 _5yjp']") #copies ?
        print('all_saved_items length :'+str(len(all_saved_items)))
        # http://lxml.de/lxmlhtml.html = BEST
        for saved_item in all_saved_items:
                print(saved_item.text)
                print(lxml.html.tostring(saved_item))
                raw_link = saved_item.xpath("//a[@class='_24-s']")[1].get("href") # 0 is post #0, 1 is post #, etc.
                #print(raw_link)


print('Hello World')
get_crawled_data()