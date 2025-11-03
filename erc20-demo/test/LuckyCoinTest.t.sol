// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import {LuckyCoin} from "../src/LuckyCoin.sol";

contract LuckyCoinTest is Test {
    LuckyCoin public lc;
    address owner = vm.addr(1);
    address user = vm.addr(2);

    function setUp() public {
        lc = new LuckyCoin(owner);
        vm.deal(owner, 10 ether);
    }

    function testSuccessIfOwnerMints() public {
        vm.startPrank(owner);
        lc.mint(10 ether);
        vm.stopPrank();

        assertEq(lc.balanceOf(owner), 10 ether);
    }

    function testRevertIfNonOwnerMints() public {
        vm.startPrank(user);
        vm.expectRevert();
        lc.mint(10 ether);
        vm.stopPrank();


        assertEq(lc.balanceOf(user), 0);
    }

    function testSuccessIfOwnerBurns() public {
        vm.startPrank(owner);
        lc.mint(10 ether);
        vm.stopPrank();
        assertEq(lc.balanceOf(owner), 10 ether);

        vm.startPrank(owner);
        lc.burn(5 ether);
        vm.stopPrank();

        assertEq(lc.balanceOf(owner), 5 ether);
    }

    function testRevertIfNonOwnerBurns() public {
        vm.startPrank(owner);
        lc.mint(10 ether);
        vm.stopPrank();
        assertEq(lc.balanceOf(owner), 10 ether);

        vm.startPrank(user);
        vm.expectRevert();
        lc.burn(5 ether);
        vm.stopPrank();

        assertEq(lc.balanceOf(owner), 10 ether);
        assertEq(lc.balanceOf(user), 0);
    }
}
