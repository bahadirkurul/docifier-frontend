import React, { Component } from "react";
import { Skeleton, CircularProgress, Backdrop, Box } from "@mui/material";

interface Props {
  spinning: boolean;
  children: any;
  skeleton?: boolean;
}

interface State {
  skeleton: boolean;
}

export default class CustomSpinner extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      skeleton: props.skeleton === undefined ? true : props.skeleton,
    }
  }

  render() {

    return (
      <>
        {this.state.skeleton ? (
          this.props.spinning ? (
            <Box>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }} open>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Skeleton sx={{margin: 1 , marginBottom: 4, marginTop: 3}} width={'65vh'} variant="rounded" animation={this.state.skeleton ? 'wave' : false}></Skeleton>
              <Skeleton sx={{margin: 1}} variant="rounded" animation={this.state.skeleton ? 'wave' : false}></Skeleton>
              <Skeleton sx={{margin: 1}} variant="rounded" animation={this.state.skeleton ? 'wave' : false}></Skeleton>
              <Skeleton sx={{margin: 1}} width={'110vh'} variant="rounded" animation={this.state.skeleton ? 'wave' : false}></Skeleton>
            </Box>
          ) : (
            this.props.children
          )
        ) : (
          this.props.children
        )}
      </>
    )
  }
}