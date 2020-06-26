# Final GA Project: Journal App
# Working Title Dear Diary

## MVP

* Full CRUD
* Authorization/Authentication
* Word Processor (Editor.js or Froala)
* Host Images (VPS or AmazonS3)
* Use New Framework (Vue)

## Bonus

* Filter entries by tag or subject
* Use an API to import something like basic weather info for that day
* Edit/Delete Users

## Views Needed
* Main Index (filter by entry tag)
* New Entry
* Edit Entry
* Show Entry
* Login
* Create User
* Edit/Delete User (bonus)

## Models

```
class Entry(models.Model):
    title = models.CharField(max_length=100)
    entry = models.TextField()
    image = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s %s' % (self.title, self.entry, self.image)

    def save(self, *args, **kwargs):
        return super(Entry, self).save(*args, **kwargs)
```
Still need to add 'tag' to Entry model

User:
    username:
    password:

## Repo links

https://github.com/mikehoods/final_project_frontend


https://github.com/mikehoods/final_project_backend

## Desktop Figma

![Desktop Figma](/public/images/Desktop_Figma.png)

## Mobile Design

So far, I just have a sloppy hand drawn sketch for this.