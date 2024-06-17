import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export function ArticleCard({article}) {
    const createdAt = article.created_at
    const date = createdAt.substring(0,10)

  return (
    <Card sx={{ maxWidth: 350, minWidth: 350, margin: '1.5rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={article.article_img_url}
          alt="article image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.topic}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}