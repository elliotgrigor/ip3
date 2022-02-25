# Integrated Project 3

## How to use Git via a command line

**To use Git Cli you would need to use GitBash for Windows or the terminal for Mac/Linux**

**The link to download GitBash is below.**

https://git-scm.com/downloads

### Installing Git and initial set up of Repository
First check if Git is already installed using the following command:
```git --version```

If Git has been installed the result should be similar to:
git version 2.17.1 
(The version type won't matter as long as its been installed)

If that's not the case then Git hasn't been installed, it can be installed by using the following command:

```sudo apt-get install git -y```

Once installed you will need to configure git to use your GitHub credentials using the Commands below while replacing USERNAME(Keep the "") and EMAIL with your accounts username and linked email:
```
git config --global user.name “USERNAME”
git config --global user.email EMAIL
```

You can check if you've inputted them correctly via `git config --global -l`

With all that done the next step is to clone the repository to you computer using the following command:

```git clone git@github.com:elliotgrigor/ip3.git```

Once that has been completed you can see the repository ip3 in your folders by entering `ls` into the terminal

To go into via the Command line using the command `cd ip3`


## Common Commands that you will be using in this project
**These commands should be used while you are in the ip3 folder**

To get the latest version of the repository using the following command:

```git pull```

### The 'Push' Process
To start the push process use following command while replacing the relevant text with a file name or directory:

```git add FILENAME.file```

Next is the commit command which will define the branch (This will usually be -m but might change throughout development) and a comment describing  what this changes or things have been made with this push as shown below:

```git commit -m ‘add some text’```

Once this is done you can then push the GitHub Repository Using the following command:

```git push```

You Should be able to see your changes to the Repository on GitHub