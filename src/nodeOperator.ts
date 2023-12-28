import {
  ClusterAdded as ClusterAddedEvent,
  OwnerChanged as OwnerChangedEvent,
  SSVOperatorRegistered as SSVOperatorRegisteredEvent,
  SSVOperatorUpdated as SSVOperatorUpdatedEvent
} from "../generated/NodeOperator/NodeOperator"
import {
  Cluster,
  Constant,
  NodeOperators,
} from "../generated/schema"

export function handleClusterAdded(event: ClusterAddedEvent): void {
  let entity = Cluster.load(event.params.clusterId.toString())
  if(entity!=null){
    entity.operatorIds = event.params.operatorIds;
  }else{
    entity = new Cluster(event.params.clusterId.toString())
    entity.operatorIds = event.params.operatorIds;
  }
  entity.save()
}

export function handleOwnerChanged(event:OwnerChangedEvent): void {
    let entity = Constant.load("NodeOperatorOwner")
    if(entity!=null){
        entity.value = event.params.newOwner.toHexString()
    }else{
        entity = new Constant("NodeOperatorOwner")
        entity.value = event.params.newOwner.toHexString()
    }
    entity.save()
}
export function handleSSVOperatorRegistered(event:SSVOperatorRegisteredEvent): void {
    let entity = new NodeOperators(event.params.operatorId.toString())
    entity.ip = event.params.ip_address
    entity.name = event.params.name
    entity.pubkey = event.params.pubKey
    entity.save()

}
export function handleSSVOperatorUpdated(event:SSVOperatorUpdatedEvent): void {
    let entity = NodeOperators.load(event.params._operator_id.toString())
    if(entity!=null){
        entity.ip = event.params._ip_address
        entity.save()
    }
}
