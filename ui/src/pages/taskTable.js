import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import IconButton from '@material-ui/core/IconButton';

import API from '../api';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const statusLabels={
    "sampling_complete":"Configurations generated. Building TF Models...",
    "fm_complete":"Base FM generated. Sampling configurations...",
    "generation_complete":"Complete. TF models built and trained.",
    "init":"Building Base Feature Model..."
}

class PipelineTableComponent extends React.Component {
    _isMounted = false;

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            headers : [],
            tasks: []

        }
        
        
  
    }

    componentDidMount() {
      this._isMounted = true;
      this.load_tasks()
      setInterval(() => {this.load_tasks()}, 5000);

    }
    componentWillUnmount() {
      this._isMounted = false;
    }

    async load_tasks(){
        API.get(`sample/`, {userId:this.props.usr.id})
          .then(res => {
              var headers = []
              var tasks = []
              headers = ["task_name","formattedTime","formattedStatus", "pdt","products", "nb_initial_config", "nb_valid_elements","max_sampling_time"]
              
              if(this._isMounted){
                
                if(res.data && res.data.length){
                  
                  //headers = Object.keys(res.data[0])
                  tasks = res.data.map(e => {e["formattedStatus"] = statusLabels[e["status"]]; e["formattedTime"] = new Date(parseInt(e["timestamp"])*1000).toLocaleString('fr-FR'); return e;})
                  //alert(JSON.stringify(this.state))
          
                }
                this.setState({tasks:tasks, headers:headers})
              }
            
          })
    }
    
    handleDeleteTaskClickOpen = (task) => {
      //this.setState({ selectedTask: campaign });
    };

    handleDetailsTaskClickOpen = (task) => {
      this.props.onTaskSelect(task)
    };

    render() {
        const { classes } = this.props;
        const {tasks, headers} = this.state;
    
        return (
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                    {headers.map(header => (
                        <StyledTableCell>{header}</StyledTableCell>
                    ))}
                    <StyledTableCell></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tasks.map(row => (
                        <StyledTableRow key={row.id}>
                        {headers.map(val => (
                            <StyledTableCell>{row[val]}</StyledTableCell>
                        ))}
                        <StyledTableCell>
                          <IconButton aria-label="delete" className={classes.margin} onClick={() => {this.handleDeleteTaskClickOpen(row)}}>
                            <DeleteIcon/>
                          </IconButton>
                          <IconButton aria-label="see" className={classes.margin} onClick={() => {this.handleDetailsTaskClickOpen(row)}}>
                            <VisibilityIcon/>
                          </IconButton>
                          
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            );
    }
}

PipelineTableComponent.propTypes = {
    classes: PropTypes.object.isRequired
};


const PipelineTablePage = withStyles(styles)(PipelineTableComponent);

export default PipelineTablePage