import React from 'react';
import db from './firebasedb';
import ReactDOM from 'react-dom';
import './index.css';
var id=0
var squar,temp,sig
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function ini(){
  if(id==0){

      id=(squar.player+1)>2?1:squar.player+1
      db.firestore().collection('state').doc("game").update({
        player:(squar.player+1)>2?1:squar.player+1,
        squares:id==1?Array(9).fill(null):squar.squares,
        xIsNext: id==1? true:squar.xIsNext,
      }).then(function(){
        console.log("Document successfully written");
      }).catch(function(error){
        console.log("Error adding document: ",error);
      })
  }
}

function Reset(){
 
  db.firestore().collection('state').doc("game").update({
        squares:Array(9).fill(null),
        xIsNext: true,
      }).then(function(){
        console.log("Document successfully written");
      }).catch(function(error){
        console.log("Error adding document: ",error);
      })

}

function Square(props){
 
  return(
   <button className="square"
   onClick={props.onClick}>
   {props.value}

   </button>
    );
}

class Board extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      p1: false,
      p2:false,
      squares:Array(9).fill(null),
      xIsNext:true,
    };
    this.update=this.update.bind(this)
  }
  handleClick(i){   
  if((id==1 && squar.xIsNext==false) || (id==2 && squar.xIsNext==true)){
     return
   } 
    const squares=this.state.squares.slice();
    if (calculateWinner(squares) || squares[i])
     {  
         return;
      }
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext,
    });
    temp=squares.slice()
    sig=!this.state.xIsNext
    db.firestore().collection('state').doc("game").update({
        squares:temp,
        xIsNext:sig
    }).then(function(){
        console.log("Document successfully written");
    }).catch(function(error){
        console.log("Error adding document: ",error);
    })
  }
  update(){
    if(squar)
        this.setState({
            squares:squar.squares.slice(),
            xIsNext:squar.xIsNext,
         });
  }
  componentDidMount(){
     setInterval(this.update,1000)
  }
  renderSquare(i){
    return (<Square 
         value={this.state.squares[i]}
         onClick={()=>this.handleClick(i)}
      />
    );
   }
  render() {   
   db.firestore().collection("state").doc("game").onSnapshot(function(doc) {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
         squar=doc.data()
         if(squar)
         ini();
    });

    const winner = calculateWinner(this.state.squares);    
    let status;    
    if (winner) {      
      status = 'Winner: ' + winner=='X'; 
         } 
    else {     
     status = 'Next player: ' + 
     (this.state.xIsNext ? 'X' : 'O');    
   }
 
    return (
      <div>
        <div className="status"><a>{status}</a></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        
        </div>
      </div>

    );

  }
}
//
class Game extends React.Component {
  

  render() {
 
     
    return (
      <div className="game">

        <div className="game-board">

          <Board />
          <br/>
          <button 
            onClick={()=>Reset()}>
                 Reiniciar

   </button>
        </div>
        <div className="game-info">
          <div></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />
  ,
  document.getElementById('root')
);
