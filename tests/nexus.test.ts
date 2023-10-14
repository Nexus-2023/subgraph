import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ClusterAdded } from "../generated/schema"
import { ClusterAdded as ClusterAddedEvent } from "../generated/Nexus/Nexus"
import { handleClusterAdded } from "../src/nexus"
import { createClusterAddedEvent } from "./nexus-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let clusterId = BigInt.fromI32(234)
    let operatorIds = [BigInt.fromI32(234)]
    let newClusterAddedEvent = createClusterAddedEvent(clusterId, operatorIds)
    handleClusterAdded(newClusterAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClusterAdded created and stored", () => {
    assert.entityCount("ClusterAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClusterAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "clusterId",
      "234"
    )
    assert.fieldEquals(
      "ClusterAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "operatorIds",
      "[234]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
