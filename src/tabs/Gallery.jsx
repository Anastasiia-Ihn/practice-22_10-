import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    itemsImg: [],
    page: 1,
    btnVisibale: false,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;
    try {
      const images = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        itemsImg: [...prevState.itemsImg, ...images.photos],
        btnVisibale: images.page < Math.ceil(images.total_results / images.per_page),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = query => {
    this.setState({
      query,
    });
  };

  onClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
       {this.state.itemsImg.length===0 && <Text textAlign="center">Sorry. There are no images ... 😭</Text>} 
        <Grid>
          {this.state.itemsImg.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
       { this.state.btnVisibale && <Button type="button" onClick={this.onClick}>Load more</Button>}
      </>
    );
  }
}
