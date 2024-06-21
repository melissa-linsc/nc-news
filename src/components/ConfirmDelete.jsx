import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteArticle } from '../utils/api';

export function ConfirmDelete({article, articles, setArticles, setAlertMessage, setShowAlertMessage}) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(false);
  };

  function handleDelete(articleToDelete) {

            deleteArticle(articleToDelete.article_id).then(() => {
            setOpen(false);
            setAlertMessage('Article Deleted!')
            setShowAlertMessage(true)
            setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
            setArticles((currarticles) => {
                const filteredarticles = currarticles.filter((currArticle) => {
                    return currArticle.article_id !== articleToDelete.article_id
                })
                return filteredarticles
                })
        })
        .catch((err)=> {
                setArticles(articles)
                setAlertMessage('Error deleting comment, try again later')
                setShowAlertMessage(true)
                setTimeout(() => {
                    setShowAlertMessage(false)
                }, 4000)
        })
    }

    function handleDeleteClick(event) {{
            event.stopPropagation()
            event.preventDefault()
      
            handleDelete(article)
    }
    }

  return (
    <React.Fragment>
      <DeleteIcon onClick={handleClickOpen}>
      </DeleteIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this article?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This article will be permanently deleted and cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}