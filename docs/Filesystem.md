# ArcOS File System

> Written on January 20th, 2022 at 10:57 PM.

ArcOS had a file explorer in it's original codebase. It used basic stuff from the Node:FS/Promises API in order to read and modify files and directories on the filesystem. In this file I'll be going through and writing down some of the basic FS interactions I want to implement into the ArcAPI so that we can re-implement a filemanager into ArcOS.

## What endpoints?

These are the base endpoints I need to implement before even considering adding anything to the frontend:

- Creating files
- Creating directories
- Reading directories
- Reading files
- Editing files
- Copying files
- Copying directories
- Moving files
- Moving directories
- Renaming files/folders
- Querying total disk size
- Querying available disk size

## FS disablement or limiting

For public API's, if the user were to know the total disk size they would be able to fill up the entire disk by using _their account_ to access _their_ personal file system. This reveals a set of issues we need to solve for when the API is publicly deployed. How do we ensure that users can't fill up the entire file system? Size or rate limiting of the API's FS features? Adding the option to disable the filesystem integration entirely?

We can do one of the following things:

- Limit the file size you can upload _and/or_:
- the amount of times you can upload a file per hour.

Both would ultimately prevent the entire filesystem to be filled up, although the second option is quite weak without the first option being implemented also. Remember, this is all proof of concept. We don't _know_ how or when or why we should implement any rate limiting or anything, but it is an option we need to consider if we want to prevent our FS from being bombarded with too large files.

## Filesystem integration

Actually, FS integration poses another set of things we COULD (sometimes not _should_) into the ArcAPI, like **plugins**. They would allow us to be able to disable or enable certain aspects of the API (authentication, FS interaction, etc) depending on the user's needs.
